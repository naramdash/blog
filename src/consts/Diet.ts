import { getWeek } from "date-fns"

const OriginShareLink =
  "https://hyu-my.sharepoint.com/:x:/g/personal/kimjuho_hanyang_ac_kr/EQbP1c9OqBFFup9P3Wl0e6IB_YhoMZk4MEbuVgLrTFxWqQ?e=UAx00F"

const originUrl = new URL(OriginShareLink)
const originProtocol = originUrl.protocol
const originHostname = originUrl.hostname
const originPathname = originUrl.pathname
const originSearchParam = new URLSearchParams(originUrl.searchParams.toString())

/**
 * [Embed your Excel workbook on your web page or blog from SharePoint or OneDrive for Business](https://support.microsoft.com/en-us/office/embed-your-excel-workbook-on-your-web-page-or-blog-from-sharepoint-or-onedrive-for-business-7af74ce6-e8a0-48ac-ba3b-a1dd627b7773)
 * @param action To present the workbook as an embedded workbook
 * @param wdHideSheetTabs To present the workbook as an embedded workbook
 * @param wdAllowInteractivity To allow interactivity with filters and Pivot tables in the workbook
 * @param wdbipreview To have BI features such as Power View visualizations, PivotTables, and Data Model-based slicers work in the embedded workbook
 * @param wdHideGridlines Hides worksheet gridlines for a cleaner look.
 * @param wdHideHeaders Hides the column and row headers.
 * @param wdDownloadButton Includes the Download button so viewers can download their own copy of the workbook.
 * @param Item Displays a specific item
 * @param ActiveCell Specifies the active (selected) cell in the embedded workbook when the web page opens. You can specify the active cell by cell reference (such as A1) or by name.
 */

const True = "True"
const False = "False"

const DefaultParameters = {
  action: "embedview",
  wdHideSheetTabs: True,
  wdAllowInteractivity: False,
  wdbipreview: False,
  wdHideGridlines: False,
  wdHideHeaders: True,
  wdDownloadButton: False,
  // Item: undefined,
  ActiveCell: "A1",
}

export default {
  get menuTableLink(): string {
    const now = Date.now()
    const rowIndex = 1 + 2 * getWeek(now)
    const ActiveCell = `A${rowIndex}`
    const parametersWithThisWeekCell = {
      ...DefaultParameters,
      ActiveCell,
    }

    Object.entries(parametersWithThisWeekCell).forEach(([key, value]) =>
      originSearchParam.set(key, value),
    )
    return `${originProtocol}//${originHostname}${originPathname}?${originSearchParam.toString()}`
  },
}
