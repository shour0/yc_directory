import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url().refine((url) => {
    // Simple URL pattern check for common image extensions
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
    const commonImageDomains = /^https?:\/\/(.*\.)?(picsum\.photos|unsplash\.com|images\.unsplash\.com|cdn\.|imgur\.com|imgs\.search\.brave\.com|encrypted-tbn\d*\.gstatic\.com|images\.pexels\.com|pixabay\.com)/i;
    
    return imageExtensions.test(url) || commonImageDomains.test(url);
  }, {
    message: "Please provide a valid image URL (jpg, jpeg, png, gif, webp, svg, bmp, ico) or from a known image service"
  }),
  pitch: z.string().min(10)
})