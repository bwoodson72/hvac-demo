// Queries (strings) — use these directly with the Sanity client or Vision tool
export { siteQuery } from "./settings"
export { homepageQuery } from "./homepage"
export { allServicesQuery, serviceBySlugQuery } from "./services"
export { allServiceAreasQuery, serviceAreaBySlugQuery } from "./serviceAreas"
export { pageBySlugQuery, allPagesNavQuery } from "./pages"
export { allTestimonialsQuery, featuredTestimonialsQuery } from "./testimonials"
export { allFaqsQuery, faqsByCategoryQuery, featuredFaqsQuery } from "./faqs"
export { allTeamMembersQuery, featuredTeamMembersQuery } from "./team"
export { allProjectsQuery, featuredProjectsQuery } from "./projects"
export { allPostsQuery, postBySlugQuery } from "./posts"
export { activeOffersQuery, offersByLocationQuery } from "./offers"

// Typed fetcher functions — the only way page components should load data
export { getSite } from "./settings"
export { getHomepage } from "./homepage"
export { getAllServices, getServiceBySlug } from "./services"
export { getAllServiceAreas, getServiceAreaBySlug } from "./serviceAreas"
export { getPageBySlug } from "./pages"
export {
  getAllTestimonials,
  getFeaturedTestimonials,
} from "./testimonials"
export {
  getAllFaqs,
  getFaqsByCategory,
  getFeaturedFaqs,
} from "./faqs"
export { getAllTeamMembers, getFeaturedTeamMembers } from "./team"
export { getAllProjects, getFeaturedProjects } from "./projects"
export { getAllPosts, getPostBySlug } from "./posts"
export { getActiveOffers, getOffersByLocation } from "./offers"
