import type { MetadataRoute } from "next";
const routes=["/","/work","/work/brand-worlds","/work/digital-systems","/work/live-experiences","/work/growth-engine","/services","/experiences","/about","/insights","/insights/ai-product","/insights/search-answer-systems","/insights/experience-afterlife","/insights/brand-as-system","/start"];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((url)=>({url:"https://digitalemedia.group"+url,lastModified:new Date()}));
}