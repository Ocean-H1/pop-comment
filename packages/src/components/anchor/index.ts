import { withInstall } from '~/util'
import Anchor from './anchor.vue'

export type AnchorInstance = InstanceType<typeof Anchor>
export const PAnchor = withInstall(Anchor)
export default PAnchor
