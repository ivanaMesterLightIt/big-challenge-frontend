import { Fragment, useState, FC, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import classnames from 'classnames'

interface SelectProps {
  options: { id: number; name: string }[]
  defaultSelected?: { id: number; name: string }
  onselect: (value: { id: number; name: string }) => void
}

export const tw: typeof classnames = (...params) =>
  twMerge(classnames(...params))

export const Select: FC<SelectProps> = ({
  options,
  defaultSelected,
  onselect,
}) => {
  const [selected, setSelected] = useState(defaultSelected || options[0])

  const handleSelected = (value: { id: number; name: string }) => {
    setSelected(value)
    onselect(selected)
  }

  return (
    <Listbox value={selected} onChange={handleSelected}>
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map(option => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    tw(
                      active ? 'text-white bg-blue-600' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )
                  }
                  value={option}>
                  {({ selected, active }) => (
                    <>
                      <span
                        className={tw(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        )}>
                        {option.name}
                      </span>

                      {selected ? (
                        <span
                          className={tw(
                            active ? 'text-white' : 'text-blue-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
