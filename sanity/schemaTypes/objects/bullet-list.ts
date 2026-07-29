import {defineArrayMember, defineType} from 'sanity'

/** Registered in internationalizedArray `fieldTypes` as `bulletList` (Task 1.4). */
export const bulletList = defineType({
  name: 'bulletList',
  title: 'Bullet List',
  type: 'array',
  of: [defineArrayMember({type: 'string'})],
})
