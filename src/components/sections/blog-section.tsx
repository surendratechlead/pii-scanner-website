import { ArrowRight } from 'lucide-react'

const BLOG_POSTS = [
  {
    title: 'Navigating DPDPA Compliance: What You Need to Know',
    excerpt:
      'Learn how the new Data Protection and Digital Privacy Act impacts your data storage strategies.',
    date: 'March 12, 2024',
    readTime: '8 min read',
    category: 'COMPLIANCE',
    categoryColor: 'bg-teal-500 text-slate-950',
    gradient: 'from-teal-500/20 to-sky-500/20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1osXD-_i79AlYCvxlIYbyk2pf2opia8c9spreP05rtSpMbLIPgj5252u6wGdhF98yVtLFry5Jf3Ap_fMbXKZ0oz1pAQ1FPQrRlI2Z5IRRAVObgDjwE5laS1Oz2HM2HEajldv7D7AhU6qFIDpqwMVpu8zYeBa2SzkyS6wSAETMTSH3X6jgfVcWWQ39W_I2YmJO70u1T_LQ14cCim_Fi6O6R-cvWq_xJPUOrsHpIrUfcXM0lqH97_EpXP_zyM0DacQEsR4SendQ0NSh',
  },
  {
    title: 'The Future of AI in Data Privacy: Predictive Scanning',
    excerpt:
      'Exploring how LLMs are revolutionizing the way we detect and mask sensitive information.',
    date: 'March 08, 2024',
    readTime: '6 min read',
    category: 'AI TECH',
    categoryColor: 'bg-sky-500 text-slate-950',
    gradient: 'from-sky-500/20 to-teal-500/20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLx6Vp0Ax2m8jylSqXMPlAUOHeJxgX76RV3bHAvQtedMfrkkdmriJQm4NSFJLbyapZnP7MbJR9cASSmFSMHLvO3aGAfHZWJ73pwdHwpw5GmBl3NsLlMdeOrWtib2PKHj9mIJwwHDoTho2_P7wTlf1jhcT6Skzh5UHkUSJDdo3qgo84DLLmno7bEAEBaaIjNm4egrHagKYXSN5_nkFZ30iETy50m0YYNahLG4ho-WFNFWhq4iypYduYUX9ZZ-PisXvk_jlaTqwluqcu',
  },
  {
    title: 'Building a Proactive Security Culture in Remote Teams',
    excerpt:
      'Best practices for maintaining data hygiene across distributed engineering organizations.',
    date: 'February 28, 2024',
    readTime: '10 min read',
    category: 'SECURITY',
    categoryColor: 'bg-indigo-500 text-white',
    gradient: 'from-teal-500/20 to-indigo-500/20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKGA8x2mAH1zgc8k5Yu0caUQN4OySkvHyqjskOu4HSGAlGshMP3V4B6qdouxrz2LMlC3NYhPiNfM-QK1SvJ2QeyjeU0RSxgpptwupJ58jvpf_GK3Vr4aKnFVkPtRFpMG0Z0AVGfZnBjOAC19kDZbBN3-8ccbw8MQsky-eR4ZX5xqWXVULQZ_bTFWkotO1fEKEW-DHVi2sn77PJpS7LAIL94iO6s_zXaM_YUlt0KI73O-2wEt0aw3sShvkdKfP4DycjKrKueg7kcvDG',
  },
]

export function BlogSection() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute -right-64 top-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-headline font-bold text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-slate-400">
              Insights, guides, and updates from the frontline of data security.
            </p>
          </div>
          <span className="group flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors cursor-pointer">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.title}
              className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-48 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${post.gradient} z-10`}
                />
                <img
                  alt={post.title}
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={`${post.categoryColor} px-3 py-1 rounded-full text-xs font-bold font-label`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-500 mb-2 font-label">
                  {post.date} &bull; {post.readTime}
                </p>
                <h3 className="text-xl font-headline font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
