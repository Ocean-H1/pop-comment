import { withInstall } from '~/util'
import foldVue from './fold.vue'

export type FoldInstance = InstanceType<typeof foldVue>
export const PFold = withInstall(foldVue)

export default PFold
