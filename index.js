import Vue from "./node_modules/vue/dist/vue.esm.browser.js";
import { emailRegex } from "./config.js";
import { passwordRegex } from "./config.js";

const DropdownComponent = {
    template: "#dropdown-template",
    props: ["dropdownTittle", "dropdownItems"],
    data() {
        return {
            isOpen: false
        };
    }
}

const HeaderComponent = {
    props: ["user"],
    template: "#header-template",
    data() {
        return {
            title: "Haeder component",
            courses: [
                'Video Courses',
                'Vue.js Master Class 2024 Edition',
                'Vue.js Master Class',
                'Workshops',
                'Mastering Nuxt'
            ],
            businessServices: [
                'Vue.js Corporate Training', 
                'Workshops', 
                'Hiring'
            ],
            events: [
                "Vue.js Nation",
                "Nuxt Nation",
                "Vue.js Forge"
            ]
        };
    },
    components: {
        "dropdown-component": DropdownComponent
    }
}

const FormComponent = {
    template: "#form-template",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            isCreateAccount: false,
            errorMessage: ""
        };
    },
    computed: {
        isButtonDisabled() {
            return !this.name || !this.email || !this.password;
        }
    },
    methods: {
        clearInputFields() {
            this.name = "";
            this.email = "";
            this.password = "";
        },
        handlerError(message) {
            this.errorMessage = message;
            setTimeout(() => {
                this.errorMessage = "";
            }, 3000);
        },
        async submitForm() {
            this.isCreateAccount = true;
            //simulate server request
            await  new Promise((resolve, reject) => setTimeout(() => resolve(true), 2000)) // sleep 2 sec

            if(!emailRegex.test(this.email)) {
                this.isCreateAccount = false;
                this.handlerError("Invalid email");
                return;
            }

            if(!passwordRegex.test(this.password)) {
                this.isCreateAccount = false;
                this.handlerError("Password must be at least 4 digits");
                return;
            }
            
            this.$emit("on-create-account", {
                name: this.name,
                email: this.email,
                password: this.password
            });
            this.clearInputFields();
            this.isCreateAccount = false;
        }
    },
}


const mainComponent = {
    template: "#main-template",
    data() {
        return {
            message: "Main component"
        };
    },
    components: {
        "app-form": FormComponent
    },
    methods: {
        handleCreateAccount(payload) {
            this.$emit("on-create-account-tunnel", payload);
        }
    }
}

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        user: {}
    },
    methods: {
        handleCreateAccount(payload) {
            this.user = payload;
        }
    },
    components: {
        'app-header': HeaderComponent,
        'app-main': mainComponent
    }
});