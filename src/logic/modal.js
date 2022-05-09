
import {createApp} from 'vue'
import Modal from "@/components/modal.vue";

export function modalwindow () {

    const openmodal = (ev, item, index) => {

    const mountEl = document.createElement('div');
        document.body.appendChild(mountEl);

        const dialog = createApp({extends:Modal }, {
            _showmodal: true,
            _pokename: item
        });

        dialog.mount(mountEl);
    }
    return {openmodal}

}