import TextCompt from './compts/TextCompt.vue'
import ImgCompt from './compts/ImgCompt.vue'

const compts = {};
([
  TextCompt,
  ImgCompt
]).forEach(compt => {
  compts[`${compt.name}`] = compt
})
export default compts
