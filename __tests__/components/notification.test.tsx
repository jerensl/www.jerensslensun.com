/**
 * @jest-environment jsdom
 */

import { renderWithClient } from '../../__mocks__/utils/react-query'
import { Notifications, notify } from '../../src/components/Notifications'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)
import { useNotification } from '@/context/useNotification'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'

const mockedUseNotification = useNotification as jest.Mock

jest.mock('@/context/useNotification', () => ({
    useNotification: jest.fn(() => {}),
}))

describe('Notification', () => {
    it('Should render status not subscriber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: false },
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('subscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn on Notification' })
        )
    })

    it('Should render status subsrsiber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: true },
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('unsubscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn off Notification' })
        )
    })

    it('Should render status loading', async () => {
        mockedUseNotification.mockImplementation(() => ({
            isLoading: true,
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('loading')).toBeInTheDocument()
    })

    it('Should show notification', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: true },
        }))

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        })

        const result = renderWithClient(<Notifications />)

        act(() => {
            notify('/icons/icon-512x512.png', 'Hello', 'this is notification')
        })

        expect(await result.findByText('this is notification')).toBeVisible()

        userEvent.click(result.getByRole('button', { name: 'Close' }))
    })
})