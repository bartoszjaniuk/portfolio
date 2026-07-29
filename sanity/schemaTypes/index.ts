import {experience} from './documents/experience'
import {homePage} from './documents/home-page'
import {project} from './documents/project'
import {siteSettings} from './documents/site-settings'
import {techItem} from './documents/tech-item'
import {bulletList} from './objects/bullet-list'
import {headlineSegment} from './objects/headline-segment'
import {link} from './objects/link'
import {navItem} from './objects/nav-item'
import {seoFields} from './objects/seo-fields'
import {socialLink} from './objects/social-link'
import {themedLogo} from './objects/themed-logo'

export const schemaTypes = [
  // Objects
  headlineSegment,
  link,
  navItem,
  socialLink,
  themedLogo,
  bulletList,
  seoFields,
  // Documents
  homePage,
  project,
  experience,
  techItem,
  siteSettings,
]
