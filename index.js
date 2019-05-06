/**
 * webpack plugin for transform color
 * {
 *     theme: {
 *         originColor: [],
 *         finalColor: []
 *     }
 * }
 */
class ColorTransform {
    constructor (options) {
        this.options = options;
        console.log('ColorTransform constructor:', options);
    }
    _transfer(theme, pathName, compilation) {
        console.log('Transfering: ' + pathName);

        const themeObj = this.options[theme];
        const fileThemeName = pathName.replace('.css', `_${theme}.css`);
        let content = compilation.assets[pathName].source() || '';

        if (!Array.isArray(themeObj.originColor)) { return false; }

        // 替换颜色，重写指定输出模块内容
        for (let index in themeObj.originColor) {
            const originReg = new RegExp(themeObj.originColor[index], 'gi');
            const finalStr = themeObj.finalColor[index] || themeObj.originColor[index];

            if (themeObj.originColor[index] === finalStr) { return false; }

            content = content.replace(originReg, finalStr);
        }

        compilation.assets[fileThemeName] = {
            source() {
                return content;
            },
            size() {
                return content.length;
            }
        };
    }
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {

            console.log('ColorTransform emit');

            if (!Object.getOwnPropertyNames(this.options).length) {
                callback();
            }

            // 遍历所有资源文件
            for (let filePathName in compilation.assets) {
                // 筛选 css 文件进行转换
                if (/.css/i.test(filePathName)) {
                    for(let t of Object.getOwnPropertyNames(this.options)) {
                        this._transfer(t, filePathName, compilation);
                    }
                }
            }
            
            callback()
        })
    }
}

module.exports = ColorTransform;