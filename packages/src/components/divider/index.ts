import { withInstall } from '~/util'
import Divider from './divider.vue'

export type DividerInstance = InstanceType<typeof Divider>
export const PDivider = withInstall(Divider)
export default PDivider
