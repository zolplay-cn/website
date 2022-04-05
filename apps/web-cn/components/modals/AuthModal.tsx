import { AnimatePresence, motion } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import {
  Fragment,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'
import { clsxm } from 'ui'
import { UIComponent } from 'ui/@types/core'

import useInterval from '~/lib/hooks/useInterval'

import { useStore } from '~/store/app.store'

import { gql, useMutation } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import {
  AtSymbolIcon,
  DeviceMobileIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import {
  LoginIcon,
  PaperAirplaneIcon,
  UserAddIcon,
} from '@heroicons/react/solid'

export const isAuthModalOpenAtom = atom(false)

type AuthMode = 'sign_in' | 'sign_up'
const authModeAtom = atom<AuthMode>('sign_in')

type AuthTabProps = {
  selected: boolean
  onClick?: () => void
}
const AuthTab: UIComponent<AuthTabProps> = ({
  className,
  selected,
  onClick,
  children,
}) => {
  return (
    <motion.button
      className={clsxm(
        'relative flex flex-1 items-center justify-center rounded-lg',
        className
      )}
      onClick={() => onClick?.()}
    >
      {selected && (
        <motion.span
          className="absolute inset-0 z-10 rounded-lg bg-neon-500 shadow-lg shadow-neon-500/20"
          layoutId="auth-tab-selection-bg"
        />
      )}
      <span
        className={clsxm(
          'relative z-20 text-sm font-semibold transition duration-500 ease-in-out',
          selected ? 'text-slate-800' : 'text-slate-50/70'
        )}
      >
        {children}
      </span>
    </motion.button>
  )
}

type AuthTabsProps = {
  tabs: { label: string; value: string }[]
  selected: string
  onSelect: (value: string) => void
}
const AuthTabs: UIComponent<AuthTabsProps> = ({
  className,
  tabs,
  selected,
  onSelect,
}) => {
  return (
    <motion.nav
      className={clsxm(
        'flex h-10 w-full rounded-xl bg-slate-100/10 p-1',
        className
      )}
      layout
    >
      {tabs.map(({ label, value }, i) => (
        <AuthTab
          key={i}
          selected={value === selected}
          onClick={() => onSelect(value)}
        >
          {label}
        </AuthTab>
      ))}
    </motion.nav>
  )
}

const SEND_SMS_MUTATION = gql`
  mutation SendSms($data: SmsInput!) {
    sendSmsCode(data: $data)
  }
`
const SIGN_IN_MUTATION = gql`
  mutation SignIn($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
    }
  }
`
const SIGN_UP_MUTATION = gql`
  mutation SignUp($data: SignupInput!) {
    signup(data: $data) {
      accessToken
      refreshToken
    }
  }
`

const phoneNumberAtom = atomWithReset('')
const verificationCodeAtom = atomWithReset('')
const smsCountdownAtom = atomWithReset(0)
const nameAtom = atomWithReset('')
const verificationCodeLength = 4

export default function AuthModal() {
  const [isOpen, setIsOpen] = useAtom(isAuthModalOpenAtom)
  const formRef = useRef<HTMLFormElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom)
  const [verificationCode, setVerificationCode] = useAtom(verificationCodeAtom)
  const [authMode, setAuthMode] = useAtom(authModeAtom)
  const [name, setName] = useAtom(nameAtom)
  const isPhoneNumberValid = useMemo(
    () =>
      /^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])[0-9]{8}$/g.test(
        phoneNumber
      ),
    [phoneNumber]
  )
  const [hasSentSMS, setHasSentSMS] = useState(false)
  const [smsCountdown, setSmsCountdown] = useAtom(smsCountdownAtom)
  const canSendSms = useMemo(
    () => isPhoneNumberValid && smsCountdown === 0,
    [isPhoneNumberValid, smsCountdown]
  )

  const [sendSmsCode, { loading: sendingSms }] = useMutation(SEND_SMS_MUTATION)
  const [signIn, { loading: signingIn }] = useMutation(SIGN_IN_MUTATION)
  const [signUp, { loading: signingUp }] = useMutation(SIGN_UP_MUTATION)

  const login = useStore((state) => state.actions.signIn)
  const submit = useCallback(async () => {
    if (signingIn || signingUp) {
      return
    }

    if (authMode === 'sign_in') {
      try {
        const { data } = await signIn({
          variables: {
            data: {
              phone: `+86${phoneNumber}`,
              verificationCode,
            },
          },
        })

        login(data.login.accessToken)
      } catch (e) {
        toast.error(e.message)
      }
    } else {
      try {
        const { data } = await signUp({
          variables: {
            data: {
              phone: `+86${phoneNumber}`,
              verificationCode,
              name,
            },
          },
        })

        login(data.signup.accessToken)
      } catch (e) {
        toast.error(e.message)
      }
    }
  }, [
    authMode,
    login,
    name,
    phoneNumber,
    signIn,
    signUp,
    signingIn,
    signingUp,
    verificationCode,
  ])

  function closeModal() {
    setIsOpen(false)
  }

  const requestSmsCode = useCallback(async () => {
    if (!canSendSms) {
      return
    }

    try {
      const { data } = await sendSmsCode({
        variables: {
          data: {
            phone: `+86${phoneNumber}`,
            type: authMode,
          },
        },
      })

      if (data.sendSmsCode) {
        setHasSentSMS(true)
        setSmsCountdown(60)
      } else {
        toast.error('验证码发送失败，请稍后重试')
      }
    } catch (e) {
      toast.error(e.message)
    }
  }, [canSendSms, sendSmsCode, phoneNumber, authMode, setSmsCountdown])

  const focusSmsInput = useCallback((i = 0) => {
    if (i < 0 || i > verificationCodeLength - 1) {
      return
    }

    setTimeout(() => {
      const nextInput = formRef.current?.elements?.namedItem(
        `code_${i}`
      ) as HTMLInputElement | null
      nextInput?.focus()
    }, 50)
  }, [])

  const onPhoneInputKeydown = useCallback<KeyboardEventHandler>(
    (e) => {
      // submit on Enter
      if (e.key === 'Enter') {
        e.preventDefault()

        if (canSendSms) {
          requestSmsCode()
          focusSmsInput()
          return
        }
      }

      // only allow numbers
      if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [canSendSms, focusSmsInput, requestSmsCode]
  )

  const handleSmsInputKeydown = useCallback(
    (i: number, key: string) => {
      if (key === 'delete') {
        focusSmsInput(i - 1)
      }
      if (key === 'Backspace') {
        setVerificationCode((code) => code.slice(0, i))
        focusSmsInput(i - 1)
      }
      if (key === 'ArrowLeft') {
        focusSmsInput(i - 1)
      }
      if (key === 'ArrowRight') {
        focusSmsInput(i + 1)
      }

      if (i === verificationCodeLength - 1 && key === 'Enter') {
        submit()
      }
    },
    [focusSmsInput, setVerificationCode, submit]
  )
  const handleSmsInputChanges = useCallback(
    (i: number, value: string) => {
      if (!/[0-9]/.test(value)) {
        return
      }

      if (value.length === 1) {
        setVerificationCode((prev) => `${prev}${value}`)
      }

      // pasted code
      if (value.length === verificationCodeLength) {
        setVerificationCode(value)
        focusSmsInput(verificationCodeLength - 1)
        return
      }

      if (i < verificationCodeLength - 1) {
        focusSmsInput(i + 1)
      }
    },
    [focusSmsInput, setVerificationCode]
  )

  // start SMS re-send count down
  useInterval(
    () => {
      setSmsCountdown((countdown) => (countdown > 0 ? countdown - 1 : 0))
    },
    isOpen && smsCountdown > 0 ? 1000 : null
  )

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={phoneInputRef}
          onClose={(confirmed) => {
            if (confirmed) {
              closeModal()
            }
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/60 saturate-150 backdrop-blur-lg" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-10 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 translate-y-5 scale-90"
            >
              <motion.div
                layout
                className="relative mt-20 inline-block transform-gpu overflow-hidden rounded-3xl border-[3px] border-indigo-400/20 bg-slate-900/50 px-4 pt-5 pb-4 text-left align-top shadow-2xl shadow-indigo-500/30 selection:bg-white/20 selection:text-slate-100 sm:my-8 sm:w-full sm:max-w-sm sm:p-8 sm:align-middle"
              >
                <div className="pointer-events-none absolute inset-0 z-10 select-none">
                  <svg
                    className="h-full w-full object-cover object-center"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_17_17)">
                      <g opacity="0.5" filter="url(#filter0_f_17_17)">
                        <path
                          d="M128.6 0H0V322.2L51.5 67.5L128.6 0Z"
                          fill="#EB03FF"
                        />
                        <path
                          d="M0 322.2V400H240H320L51.5 67.5L0 322.2Z"
                          fill="#FF0F9F"
                        />
                        <path
                          d="M320 400H400V78.75L51.5 67.5L320 400Z"
                          fill="#3A0D84"
                        />
                        <path
                          d="M400 0H128.6L51.5 67.5L400 78.75V0Z"
                          fill="#FAD8F4"
                        />
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

                <motion.header
                  layout="position"
                  className="relative z-20 space-y-5"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-slate-800">
                    {authMode === 'sign_in' ? (
                      <LoginIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <UserAddIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="text-center">
                    <Dialog.Title
                      as="h2"
                      className="relative h-6 w-full text-xl font-extrabold leading-6 text-slate-100"
                    >
                      <AnimatePresence>
                        {authMode === 'sign_in' ? (
                          <motion.span
                            key="login"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 1.05 }}
                            className="absolute inset-0"
                          >
                            登陆你的账号
                          </motion.span>
                        ) : (
                          <motion.span
                            key="signup"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 1.05 }}
                            className="absolute inset-0"
                          >
                            注册一个新账号
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Dialog.Title>
                  </div>

                  <AuthTabs
                    tabs={[
                      { label: '登陆', value: 'sign_in' },
                      { label: '注册', value: 'sign_up' },
                    ]}
                    selected={authMode}
                    onSelect={(value: AuthMode) => setAuthMode(value)}
                  />
                </motion.header>

                <motion.form
                  ref={formRef}
                  layout="position"
                  className="relative z-20 my-4 space-y-3"
                >
                  <div className="flex w-full flex-col space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-400"
                    >
                      手机号
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <DeviceMobileIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          ref={phoneInputRef}
                          type="tel"
                          name="phone"
                          id="phone"
                          defaultValue={phoneNumber}
                          className="block w-full rounded-none rounded-l-lg border-r-0 border-white/10 bg-white/10 pl-10 text-slate-100 placeholder-slate-400 focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
                          onKeyDown={onPhoneInputKeydown}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value)
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="relative -ml-px flex w-28 items-center justify-center space-x-2 rounded-r-lg border border-white/10 bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-300 opacity-100 transition hover:text-slate-50 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 disabled:opacity-40"
                        onClick={requestSmsCode}
                        disabled={!canSendSms || sendingSms}
                      >
                        <PaperAirplaneIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        {sendingSms ? (
                          <span>发送中</span>
                        ) : (
                          <span
                            className={clsxm(smsCountdown > 0 && 'font-mono')}
                          >
                            {smsCountdown > 0 ? `${smsCountdown}s` : '验证'}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {hasSentSMS && (
                    <motion.div
                      layoutId="code-input-container"
                      className="flex w-full flex-col space-y-1.5"
                    >
                      <label
                        htmlFor="code"
                        className="block text-sm font-medium text-slate-400"
                      >
                        验证码
                      </label>
                      <div className="flex justify-center">
                        <motion.div
                          className="relative grid grid-cols-4 items-stretch justify-items-center gap-3 focus-within:z-10"
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.065,
                                type: 'spring',
                              },
                            },
                          }}
                        >
                          {new Array(verificationCodeLength)
                            .fill(0)
                            .map((_, i) => (
                              <motion.input
                                key={i}
                                type="number"
                                name="code"
                                id={`code_${i}`}
                                value={verificationCode[i] ?? ''}
                                className="block h-10 w-10 appearance-none rounded-lg border-white/10 bg-white/10 p-0 text-center text-lg font-bold text-slate-100 focus:border-sky-600 focus:ring-sky-600"
                                onKeyDown={(e) =>
                                  handleSmsInputKeydown(i, e.key)
                                }
                                onChange={(e) => {
                                  const { value } = e.target
                                  handleSmsInputChanges(i, value)
                                }}
                                variants={{
                                  hidden: {
                                    opacity: 0,
                                    y: 10,
                                  },
                                  show: {
                                    opacity: 1,
                                    y: 0,
                                  },
                                }}
                              />
                            ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {authMode === 'sign_up' && (
                    <motion.div
                      layoutId="name-input-container"
                      className="flex w-full flex-col space-y-1.5"
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-400"
                      >
                        昵称
                      </label>
                      <div className="flex rounded-lg shadow-sm">
                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <AtSymbolIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            className="block w-full rounded-lg border-white/10 bg-white/10 pl-10 text-slate-100 placeholder-slate-400 focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
                            onChange={(e) => {
                              setName(e.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.form>

                <motion.div layout className="absolute top-0 left-0 z-50">
                  <button
                    onClick={closeModal}
                    className="p-3 text-slate-500 transition hover:text-slate-200"
                  >
                    <span className="sr-only">关闭弹窗</span>
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </motion.div>

                {verificationCode.length === verificationCodeLength && (
                  <motion.div
                    layoutId="submit"
                    className="relative z-30 mt-5 sm:mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-lg border border-transparent bg-sky-600 px-4 py-2 text-base font-medium font-semibold text-white shadow-lg shadow-sky-300/20 transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                      disabled={signingIn || signingUp}
                      onClick={submit}
                    >
                      {!signingIn && !signingUp && '提交'}
                      {signingIn && <span>正在登陆...</span>}
                      {signingUp && <span>正在注册...</span>}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
