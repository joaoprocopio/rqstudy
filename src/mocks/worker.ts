import { setupWorker } from "msw/browser"

import { endpoints } from "~/mocks/endpoints"

export const worker = setupWorker(...endpoints)
