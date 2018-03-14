import { FormProps, FormValues } from "react-form";

declare module "react-form" {
    interface FormProps {
        validate?(values: FormValues): any;
    }
}