import { withInstall } from '~/util'
import Icon from './icon.vue'

export type IconInstance = InstanceType<typeof Icon>
export const PIcon = withInstall(Icon)
export default PIcon
