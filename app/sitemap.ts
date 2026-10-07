import type { MetadataRoute } from "next";
const routes=["/","/work","/work/brand-worlds","/work/digital-systems","/work/live-experiences","/work/growth-engine","/work/property-intelligence","/services","/experiences","/about","/insights","/insights/ai-product","/insights/search-answer-systems","/insights/experience-afterlife","/insights/brand-as-system"];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((url)=>({url:"https://digitalemedia.group"+url,lastModified:new Date()}));
}