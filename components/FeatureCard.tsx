import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="relative group">
      <div className="relative bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-6 h-full transition-all duration-300 hover:border-sardine-stats-blue/30 hover-lift hover:shadow-lg hover:shadow-sardine-stats-blue/5">
        <div className="flex flex-col items-start space-y-4">
          <div className="p-3 rounded-lg bg-sardine-stats-blue/10 border border-sardine-stats-blue/20">
            <Icon className="w-6 h-6 text-sardine-stats-blue" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
