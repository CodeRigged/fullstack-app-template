import { ButtonProps, Divider, IconButtonProps } from "@mui/material"
import Menu from "@mui/material/Menu"
import { ComponentType, Fragment, ReactElement, useState } from "react"
import { Nullable } from "shared/types"

import { MenuListItem } from "./MenuItems"

type AppMenu = {
  Activator: ComponentType<IconButtonProps | ButtonProps>
  items: ReactElement<typeof MenuListItem | typeof Divider>[]
}

/**
 * Renders the AppMenu component with the specified Activator and items.
 *
 * @param {ComponentType<IconButtonProps | ButtonProps>} Activator - The component that triggers the menu opening.
 * @param {ReactElement<typeof MenuListItem | typeof Divider>[]} items - The list of menu items to display.
 */
const AppMenu = ({ Activator, items }: AppMenu) => {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null)
  const isOpen = Boolean(anchorEl)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Activator
        onClick={handleOpen}
        aria-controls={isOpen ? "account-menu" : undefined}
        aria-expanded={isOpen ? "true" : undefined}
      />
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div>
          {items.map((item, i) => (
            <Fragment key={`menu-item-${i}`}>{item}</Fragment>
          ))}
        </div>
      </Menu>
    </>
  )
}

export default AppMenu
