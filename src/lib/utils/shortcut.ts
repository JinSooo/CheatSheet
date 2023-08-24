import { register } from '@tauri-apps/api/globalShortcut'
import { appWindow } from '@tauri-apps/api/window'

/**
 * keyboard: https://github.com/tauri-apps/tao/blob/dev/src/keyboard.rs
 */

export const initShortCut = async () => {
  let flag = true

  await register('CommandOrControl+Shift+A', async () => {
    console.log('CommandOrControl+Shift+A')
    if (flag) {
      await appWindow.hide()
    } else {
      await appWindow.show()
    }
    flag = !flag
  })

  await register('SUPER', async () => {
    console.log('SUPER')
    if (flag) {
      await appWindow.hide()
    } else {
      await appWindow.show()
    }
    flag = !flag
  })

  // await register("Hyper", async () => {
  //   console.log("Hyper");
  //   if (flag) {
  //     await hide();
  //   } else {
  //     await show();
  //   }
  //   flag = !flag;
  // });
  console.log('initShortCut')
}
