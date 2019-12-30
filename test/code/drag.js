// 备份一下之前写的，vue自定义全屏拖拽的代码

import Vue from 'vue';
import store from '../store'

const drag = Vue.directive('drag', {
    inserted: function (el) {
        el.onmousedown = function (e) {
            e.preventDefault();
            let disx = e.pageX - el.offsetLeft;
            let disy = e.pageY - el.offsetTop;
            document.onmousemove = function (e) {
                store.dispatch('app/set_img_drag_position', {
                    position: 'absolute',
                    top: e.pageY - disy + 'px',
                    left: e.pageX - disx + 'px'
                })
            }
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            }
        }
    }
})
export default drag;