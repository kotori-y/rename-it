const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      outputDir: "BatchRename",
      builderOptions: {
        win: {
          // win相关配置

          icon: "./public/kotori.ico",

          target: [
            {
              target: "nsis", // 利用nsis制作安装程序

              arch: [
                "x64", // 64位
              ],
            },
          ],
        },

        nsis: {
          oneClick: false, // 是否一键安装

          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。

          allowToChangeInstallationDirectory: true, // 允许修改安装目录

          // installerIcon: './public/icon.ico', // 安装图标
          //
          // uninstallerIcon: './public/timg.ico', // 卸载图标
          //
          // installerHeaderIcon: './public/icon.ico', // 安装时头部图标

          createDesktopShortcut: true, // 创建桌面图标

          createStartMenuShortcut: true, // 创建开始菜单图标

          shortcutName: "RenameIt", // 图标名称

          include: "./installer.nsh", // 自定义nsis脚本 安装过程中自行调用  (可用于写入注册表 开机自启动等操作)
        },
      },
    },
  },
});
