import type { MetadataRoute } from "next";
const routes=["/","/work","/services","/experiences","/about","/insights","/insights/ai-product","/insights/search-answer-systems","/insights/experience-afterlife","/insights/brand-as-system","/start"];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((url)=>({url:"https://digitale-media.com"+url,lastModified:new Date()}));
}