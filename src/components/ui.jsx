import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

// 1. Button
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button = React.forwardRef(({ className, variant, size, isLoading, isIconOnly, startContent, endContent, children, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }), isIconOnly && "p-0 w-10")}
      ref={ref}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  )
})
Button.displayName = "Button"

// 2. Card
export const Card = React.forwardRef(({ className, isPressable, isHoverable, shadow, ...props }, ref) => (
  <div ref={ref} 
  className={cn("rounded-xl border bg-card text-card-foreground shadow-sm",
      shadow === 'sm' ? 'shadow-sm' : 'shadow-md',
      isPressable && 'cursor-pointer active:scale-[0.98] transition',
      isHoverable && 'hover:shadow-lg transition-shadow',
    className)} {...props} />
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export const CardBody = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardBody.displayName = "CardBody"


export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

// 3. Input & Label
export const Input = React.forwardRef(({ className, type, label, startContent, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <div className="relative flex items-center">
        {startContent && <span className="absolute left-3 text-muted-foreground">{startContent}</span>}
        <input
          type={type}
          className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", startContent && "pl-9", className)}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  )
})
Input.displayName = "Input"

export const Textarea = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <textarea
        className={cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Textarea.displayName = "Textarea"

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 block", className)} {...props} />
))
Label.displayName = "Label"

// 4. Dialog (Modal)
export const Modal = ({ isOpen, onClose, children, size = 'md' }) => {
  if (!isOpen) return null
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className={cn("bg-background rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto", sizes[size])} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
export const ModalContent = ({ children }) => <div>{children}</div>
export const ModalHeader = ({ children }) => <div className="flex items-center justify-between p-6 border-b">{children}</div>
export const ModalTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>
export const ModalDescription = ({ children }) => <p className="text-sm text-muted-foreground">{children}</p>
export const ModalBody = ({ children }) => <div className="p-6 space-y-4">{children}</div>
export const ModalFooter = ({ children }) => <div className="p-6 border-t flex gap-2 justify-end">{children}</div>

// 5. Badge
export const Badge = ({ children, variant = 'default', className, content, color, ...props }) => {
  // Untuk Notifikasi Keranjang
  if (content) {
    return (
      <div className="relative inline-flex" {...props}>
        {children}
        {content !== 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full text-[10px] font-bold bg-destructive text-destructive-foreground">
            {content}
          </span>
        )}
      </div>
    )
  }
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input",
    success: "bg-green-100 text-green-700 hover:bg-green-200",
    warning: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  }
  
  return <div className={cn("inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props}>{children}</div>
}
export const Chip = Badge

// 6. Utils
export const useDisclosure = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  return { isOpen, onOpen, onClose }
}

// 7. Table
export const Table = ({ children }) => <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>
export const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>
export const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
export const TableRow = ({ children }) => <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">{children}</tr>
export const TableColumn = ({ children }) => <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{children}</th>
export const TableCell = ({ children }) => <td className="p-4 align-middle">{children}</td>

// 8. Select (Native agar tidak perlu install Radix)
export const Select = ({ label, children, value, onChange, className }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <Label>{label}</Label>}
    <select 
      className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  </div>
)
export const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
)

// 9. Divider & Switch
export const Divider = ({ className }) => (
  <hr className={cn("border-t border-border my-4", className)} />
)

export const Switch = ({ isSelected, onValueChange }) => (
  <button 
    onClick={() => onValueChange(!isSelected)} 
    className={cn("relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors", isSelected ? "bg-primary" : "bg-input")}
  >
    <span className={cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform", isSelected ? "translate-x-5" : "translate-x-0")} />
  </button>
)

// 10. RadioGroup (Native)
export const RadioGroup = ({ children, value, onValueChange }) => (
  <div onChange={(e) => onValueChange(e.target.value)} className="space-y-2">{children}</div>
)
export const Radio = ({ value, children, className }) => (
  <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
    <input type="radio" value={value} className="h-4 w-4 text-primary focus:ring-primary border-input" />
    {children}
  </label>
)