import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import {
  BeakerIcon,
  CheckCircleIcon,
  IdentificationIcon,
  InboxInIcon,
  SwitchHorizontalIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'

const timeline = [
  {
    id: 1,
    content: 'HR will go through the process of screening candidates',
    icon: InboxInIcon,
    iconBackground: 'bg-teal-500 shadow-teal-300/20',
  },
  {
    id: 2,
    content: 'HR will send take-home assignments to candidates',
    icon: BeakerIcon,
    iconBackground: 'bg-blue-500 shadow-blue-300/20',
  },
  {
    id: 3,
    content: 'HR will schedule interviews with candidates',
    icon: SwitchHorizontalIcon,
    iconBackground: 'bg-orange-500 shadow-orange-300/20',
  },
  {
    id: 4,
    content: 'Our founder and team members will be interviewing candidates',
    icon: UserGroupIcon,
    iconBackground: 'bg-pink-500 shadow-pink-300/20',
  },
  {
    id: 5,
    content: 'Sending out offer 🎉, welcome to the team!',
    icon: IdentificationIcon,
    iconBackground: 'bg-emerald-500 shadow-emerald-300/20',
  },
]

type EngineerHiringProcessProps = {
  currentStep?: number
}
export const EngineerHiringProcess: UIComponent<EngineerHiringProcessProps> = ({
  className,
  currentStep,
}) => {
  return (
    <section className={clsxm('', className)}>
      <div className="relative flow-root py-6 pl-2 pr-4 lg:p-12">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_17)">
              <g opacity="0.5" filter="url(#filter0_f_17_17)">
                <path d="M128.6 0H0V322.2L51.5 67.5L128.6 0Z" fill="#EB03FF" />
                <path
                  d="M0 322.2V400H240H320L51.5 67.5L0 322.2Z"
                  fill="#FF0F9F"
                />
                <path
                  d="M320 400H400V78.75L51.5 67.5L320 400Z"
                  fill="#3A0D84"
                />
                <path d="M400 0H128.6L51.5 67.5L400 78.75V0Z" fill="#FAD8F4" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_17_17"
                x="-160.333"
                y="-160.333"
                width="720.666"
                height="720.666"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="80.1666"
                  result="effect1_foregroundBlur_17_17"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <ul role="list" className="-mb-8 list-none">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-10">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-[60%] left-[1.15rem] -ml-px h-[50%] w-0.5 bg-slate-100/10 lg:top-[72px] lg:left-6 lg:h-[40px]"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-center space-x-3">
                  <div>
                    <span
                      className={clsxm(
                        event.iconBackground,
                        'flex h-9 w-9 items-center justify-center rounded-full shadow-xl ring-4 lg:h-12 lg:w-12 lg:rounded-2xl lg:ring-8',
                        currentStep === eventIdx
                          ? 'shadow-md ring-emerald-500/10'
                          : 'ring-pink-600/10'
                      )}
                    >
                      {currentStep > eventIdx ? (
                        <CheckCircleIcon className="h-5 w-5 text-white lg:h-6 lg:w-6" />
                      ) : (
                        <event.icon
                          className="h-5 w-5 text-white lg:h-6 lg:w-6"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 space-x-4 pl-1 lg:pl-4">
                    <p
                      className={clsxm(
                        'text-sm text-slate-200/90 mix-blend-color-dodge lg:text-base',
                        currentStep > eventIdx && 'line-through',
                        currentStep === eventIdx && 'text-white/50'
                      )}
                    >
                      {event.content}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
