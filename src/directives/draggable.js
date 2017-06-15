class Draggable {
  static key = 'draggable'
  static HANDLE_KEY ='__DRAGGABLE_HANDLE__'
  constructor () {
    return {
      bind: this.directive,
      updated: this.directive,
      componentUpdated: this.directive,
      unbind: this.unbind
    }
  }
  directive (el, binding, _v) {
    el[`${Draggable.HANDLE_KEY}`] = e => {
      e.dataTransfer.setData('text', binding.value)
      const dragEle = document.querySelector('.header')
      e.dataTransfer.setDragImage(dragEle, dragEle.clientWidth, dragEle.clientHeight)
    }
    el.removeEventListener('dragstart', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('dragstart', el[`${Draggable.HANDLE_KEY}`])
    el.setAttribute('draggable', true)
  }
  unbind (el, binding, _v) {
    el.setAttribute('draggable', false)
  }
}
class Dropzone {
  static key = 'dropzone'
  static HANDLE_KEY ='__DROPZONE_HANDLE__'
  constructor () {
    return {
      bind: this.directive,
      updated: this.directive,
      componentUpdated: this.directive,
      unbind: this.unbind
    }
  }
  directive (el, binding, _v) {
    el[`${Draggable.HANDLE_KEY}`] = e => {
      e.preventDefault()
      if (e.type === 'dragover') {
        // 处理需框
      } else {
        console.log(event.dataTransfer.getData('text'))
      }
    }
    el.removeEventListener('drop', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('dragover', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('drop', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('dragover', el[`${Draggable.HANDLE_KEY}`])
  }
  unbind (el, binding, _v) {
    el.removeEventListener('drop', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('ondragover', el[`${Draggable.HANDLE_KEY}`])
  }
}
// http://www.w3school.com.cn/html5/html_5_draganddrop.asp
export default {
  install (Vue, options) {
    Vue.directive(Draggable.key, new Draggable())
    Vue.directive(Dropzone.key, new Dropzone())
  }
}
