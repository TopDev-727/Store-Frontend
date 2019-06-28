import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Compare as CompareModule } from '../'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'

export const AddToCompare = {
  name: 'AddToCompare',
  mixins: [compareMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    CompareModule.register()
  },
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    }
  }
}
