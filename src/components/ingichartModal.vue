<template>
    <div class="modal-content" style="font-size:20px;" id="loginform">
      <div class="modal-header">
        <h3 class="modal-title" style="font:bold;">{{hot_table.hname}}</h3>
      </div>
      <div class="modal-body" id="ingichartModal">
          <table style="text-align:right;">
              <tr>
                  <td style="width:150px;"><b>일련 번호</b></td>
                  <td style="width:200px;">{{hot_table.hno}}</td>
              </tr>
              <tr>
                  <td><b>법정동</b></td>
                  <td>{{hot_table.hdong}}</td>
              </tr>
              <tr>
                  <td><b>전용 면적</b></td>
                  <td>{{hot_table.hwidth}}</td>
              </tr>
              <tr>
                  <td><b>거래 가격</b></td>
                  <td>{{hot_table.hprice}}</td>
              </tr>
              <tr>
                  <td><b>좋아요 수</b></td>
                  <td>{{hot_table.count}}</td>
              </tr>
          </table>
 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">취소</button>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            val : [],
        }
    },
    props : [
        'hot_table',
    ],
    methods : {
        cancel() {
            this.$emit('close');
            this.$router.push('/');
        },
    },
    created(){

    }
}
</script>

<style>
    #ingichartModal table tr td {
        height:50px;
    }
</style>