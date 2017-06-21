class Sortable {
  static key = 'sortable'
  static HANDLE_KEY = '__SORTABLE_HANDLE__'
  constructor () {
    return {
      bind: this.directive,
      updated: this.directive,
      componentUpdated: this.directive,
      unbind: this.unbind
    }
  }
  directive (el, binding, _v) {
    el.removeEventListener('mousedown', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('mouseup', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragstart', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragend', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('drop', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragover', el[`${Sortable.HANDLE_KEY}`])
    el[`${Sortable.HANDLE_KEY}`] = e => {
      if (~['dragover', 'drop'].indexOf('e.type')) {
        e.preventDefault()
      }
      let target = e.target
      while (target.parentNode !== el && target !== el) {
        target = target.parentNode
      }
      const idx = [].slice.call(el.children).indexOf(target)
      const targetTop = target.getBoundingClientRect().top
      if (e.type === 'dragstart') {
        el.sortableIndx = idx
        el.sortableHeight = target.getBoundingClientRect().height
        e.target.style.opacity = 0.3
      } else if (e.type === 'dragover' && el.sortableIndx !== idx && e.pageY < el.sortableHeight + targetTop) {
        binding.value('progress', {
          from: el.sortableIndx,
          to: idx
        })
        el.sortableIndx = idx
      } else if (e.type === 'mousedown' && e.target !== el && event.button === 0) {
        target.setAttribute('draggable', true)
      } else if (~['dragend', 'mouseup'].indexOf(e.type)) {
        e.target.removeAttribute('draggable')
        e.target.style.opacity = ''
      }
    }
    el.addEventListener('mousedown', el[`${Sortable.HANDLE_KEY}`])
    el.addEventListener('mouseup', el[`${Sortable.HANDLE_KEY}`])
    el.addEventListener('dragstart', el[`${Sortable.HANDLE_KEY}`])
    el.addEventListener('dragend', el[`${Sortable.HANDLE_KEY}`])
    el.addEventListener('drop', el[`${Sortable.HANDLE_KEY}`])
    el.addEventListener('dragover', el[`${Sortable.HANDLE_KEY}`])
  }
  unbind (el, binding, _v) {
    el.removeEventListener('mousedown', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('mouseup', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragstart', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragend', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('drop', el[`${Sortable.HANDLE_KEY}`])
    el.removeEventListener('dragover', el[`${Sortable.HANDLE_KEY}`])
  }
}
// http://www.w3school.com.cn/html5/html_5_draganddrop.asp
export default {
  install (Vue, options) {
    Vue.directive(Sortable.key, new Sortable())
  }
}
