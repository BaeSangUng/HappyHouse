<template>
<div>
    <table>
        <tr>
            <td>ID : </td>
            <td><input type="text" disabled></td>
        </tr>
        <tr>
            <td>PW : </td>
            <td><input type="text"></td>
        </tr>
        <tr>
            <td>NAME : </td>
            <td><input type="text"></td>
        </tr>
        <tr>
            <td colspan="2">
                <button @click="update">수정</button>
                <button @click="del">삭제</button>
            </td>
            
        </tr>
    </table>
</div>
</template>

<script>
import axios from 'axios';

export default {

    methods : {
        update(){
            axios
            .put("http://localhost:8000/happyhouse/member/update")
            .then()
            .catch();
        },
        del(){
            axios
            .delete("http://localhost:8000/happyhouse/member/delete")
            .then()
            .catch();
        }
    }
}
</script>

<style>

</style>