let navigator = navigator || { platform: 'unknown' }
const IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform)

export function lock () {
  if (IS_IOS) {
    return
  }

  document.body.setAttribute('style', `
    overflow: hidden;
    -ms-touch-action: none;
    touch-action: none;
  `)
}

export function unlock () {
  if (IS_IOS) {
    return
  }

  document.body.setAttribute('style', '')
}
