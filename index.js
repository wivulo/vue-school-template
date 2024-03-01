import Vue from "./node_modules/vue/dist/vue.esm.browser.js";

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

const mainComponent = {
    template: "#main-template",
    data() {
        return {
            message: "Main component"
        };
    }

}

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
    },
    components: {
        'app-header': HeaderComponent,
        'app-main': mainComponent
    }
});