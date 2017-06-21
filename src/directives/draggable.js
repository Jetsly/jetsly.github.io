class Draggable {
  static key = 'draggable'
  static HANDLE_KEY = '__DRAGGABLE_HANDLE__'
  constructor () {
    return {
      bind: this.directive,
      updated: this.directive,
      componentUpdated: this.directive,
      unbind: this.unbind
    }
  }
  directive (el, binding, _v) {
    el.removeEventListener('dragstart', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('dragend', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('mousedown', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('mouseup', el[`${Draggable.HANDLE_KEY}`])
    el[`${Draggable.HANDLE_KEY}`] = e => {
      if (e.type === 'dragstart') {
        e.dataTransfer.setData(Draggable.key, 1)
        e.dataTransfer.setData('text', binding.value)
      } else if (e.type === 'mousedown' && event.button === 0) {
        el.setAttribute('draggable', true)
      } else if (~['dragend', 'mouseup'].indexOf(e.type)) {
        el.removeAttribute('draggable')
      }
    }
    el.addEventListener('dragstart', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('mousedown', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('mouseup', el[`${Draggable.HANDLE_KEY}`])
    el.addEventListener('dragend', el[`${Draggable.HANDLE_KEY}`])
  }
  unbind (el, binding, _v) {
    el.removeEventListener('dragstart', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('dragend', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('mousedown', el[`${Draggable.HANDLE_KEY}`])
    el.removeEventListener('mouseup', el[`${Draggable.HANDLE_KEY}`])
  }
}
class Dropzone {
  static key = 'dropzone'
  static HANDLE_KEY = '__DROPZONE_HANDLE__'
  constructor () {
    return {
      bind: this.directive,
      updated: this.directive,
      componentUpdated: this.directive,
      unbind: this.unbind
    }
  }
  directive (el, binding, _v) {
    el.removeEventListener('drop', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('dragover', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('dragenter', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('dragleave', el[`${Dropzone.HANDLE_KEY}`])
    el.enterCount = 0
    el[`${Dropzone.HANDLE_KEY}`] = e => {
      e.preventDefault()
      if (!~e.dataTransfer.types.indexOf(Draggable.key)) {
        return
      }
      let target = e.target
      if (e.type === 'dragover') {
        while (target.parentNode !== el && target !== el) {
          target = target.parentNode
        }
        binding.value('progress', [].slice.call(el.children).indexOf(target))
      } else if (e.type === 'drop') {
        binding.value('done', e.dataTransfer.getData('text'))
        el.enterCount = 0
      } else if (e.type === 'dragleave') {
        el.enterCount--
        if (el.enterCount < 0) {
          binding.value('leave')
        }
      } else if (e.type === 'dragenter' && target !== el) {
        el.enterCount++
      }
    }
    el.addEventListener('drop', el[`${Dropzone.HANDLE_KEY}`])
    el.addEventListener('dragover', el[`${Dropzone.HANDLE_KEY}`])
    el.addEventListener('dragenter', el[`${Dropzone.HANDLE_KEY}`])
    el.addEventListener('dragleave', el[`${Dropzone.HANDLE_KEY}`])
  }
  unbind (el, binding, _v) {
    el.removeEventListener('drop', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('ondragover', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('dragenter', el[`${Dropzone.HANDLE_KEY}`])
    el.removeEventListener('dragleave', el[`${Dropzone.HANDLE_KEY}`])
  }
}
// http://www.w3school.com.cn/html5/html_5_draganddrop.asp
export default {
  install (Vue, options) {
    Vue.directive(Draggable.key, new Draggable())
    Vue.directive(Dropzone.key, new Dropzone())
  }
}
