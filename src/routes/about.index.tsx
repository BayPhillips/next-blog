import { createFileRoute } from '@tanstack/react-router'

export const aboutRoute = createFileRoute('/about')({
  component: AboutPage,
  loader: async () => {
    return {
      message: 'About page working!',
      about: {
        title: 'About Me',
        content: 'This is the about page content with TanStack Router.',
        skills: ['React', 'TypeScript', 'TanStack Router', 'Vite']
      }
    }
  },
})

function AboutPage() {
  const { message, about } = aboutRoute.useLoaderData()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{about.title}</h1>
        <div className="text-lg text-muted-foreground">{message}</div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>{about.content}</p>
        
        <h3>Skills</h3>
        <ul>
          {about.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}