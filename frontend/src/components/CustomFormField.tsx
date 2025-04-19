import React, { Children, useState } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { formFieldType } from "../constants/common";


import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Eye, EyeOff } from 'lucide-react';

interface CustomProps {
    control: Control<any>,
    fieldType: any,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: any,
    iconAlt?: string,
    disabled?: boolean,
    type?:string,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (Field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const [ showPassword, setShowPassword ] = useState(false);
    const { fieldType, iconAlt, iconSrc, placeholder, dateFormat, showTimeSelect, renderSkeleton , type } = props;
    // console.log("field", field)
    switch (fieldType) {
        case formFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400 items-center w-full'>
                    {
                        iconSrc && (
                           <span style={{height:'16px', width:'16px', marginLeft:'10px'}}>{iconSrc}</span> 
                        )
                    }
                    <FormControl>
                        <Input
                            type = { type == "password" ? (showPassword ? "text" : "password") : type}
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0' />
                    </FormControl>
                    {
                        // iconSrc && (
                        //    <span style={{height:'16px', width:'16px', marginLeft:'10px'}}>{iconSrc}</span> 
                        // )
                        <span className='opacity-40' style={{marginRight:'10px', cursor:'pointer'}}onClick={() => setShowPassword(!showPassword)} >{type == "password" ? (showPassword ? <Eye size={16} /> : <EyeOff size={16} /> ) : null}</span>
                        
                    }
                </div>
            )
        case formFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4'>
                        <Checkbox
                        name={props.name}
                        checked={field.checked}
                        onCheckedChange={field.onChange} />
                        <label htmlFor={props.name} className='checkbox-label'>
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case formFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        className='shad-textArea'
                        {...field}
                        disabled={props.disabled} />
                </FormControl>
            )
        // case formFieldType.PHONE_INPUT:
        //     return (
        //         <FormControl>
        //             <PhoneInput
        //                 placeholder={placeholder}
        //                 defaultCountry='US'
        //                 international
        //                 withCountryCallingCode
        //                 value={field.value }
        //                 onChange={field.onChange}
        //                 className="input-phone"
        //              />
        //         </FormControl>
        //     )
        // case formFieldType.DATE_PICKER:
        //     return (
        //         <div className='flex rounded-md border border-dark-500 bg-dark-400'>
        //             <Image
        //                 src="/assets/icons/calendar.svg"
        //                 height={24}
        //                 width={24}
        //                 alt='calender'
        //                 className='ml-2' />
        //             <FormControl>
        //                <DatePicker 
        //                     selected={field.value} 
        //                     onChange={(date) => field.onChange(date)} 
        //                     dateFormat={dateFormat ?? "MM/dd/yyyy"}
        //                     showTimeSelect={showTimeSelect ?? false}
        //                     timeInputLabel='Time:'
        //                     wrapperClassName='date-picker'
        //                     />
        //             </FormControl>
        //         </div>
        //     )
        // case formFieldType.SELECT:
        //     return (
        //         <FormControl>
        //             <Select onValueChange={field.onChange} defaultValue={field.value}>
        //                 <FormControl className='shad-select-trigger'>
        //                     <SelectTrigger className='shad-select-trigger'>
        //                       <SelectValue placeholder={placeholder} />
        //                     </SelectTrigger>
        //                 </FormControl>
        //                 <SelectContent className='shad-select-content'>
        //                     {props.children}
        //                 </SelectContent>
        //             </Select>
        //         </FormControl>
        //     )
        case formFieldType.SKELETON: 
            return (
                renderSkeleton ? renderSkeleton(field) : null
            )
        default:
            break
    }
}

const CustomFormField = (props: CustomProps) => {

    const { control, fieldType, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1 w-full'>
                    {fieldType !== formFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField