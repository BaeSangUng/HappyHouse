<template>
  <div>
     <b-table :items="items" :fields="fields">
     </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields:['번호', '제목', '작성자', '날짜'],
      items: [
        {'번호': 1,
        '제목' : <a href="#">"반갑습니다 여러분, Ez Real estate입니다."</a>,
        '작성자' :"admin",
        '날짜' :'2020-11-19'
        },
        {'번호': 2,
        '제목' : "사용 방법은 about을 통해 확인 하여 주세요.",
        '작성자' :"admin",
        '날짜' :'2020-11-20'
        },
        {'번호': 3,
        '제목' : "투자 1000억대 돌파 되었습니다!.",
        '작성자' :"admin",
        '날짜' :'2020-11-20'
        },
        {'번호': 4,
        '제목' : "채용 공고 안내",
        '작성자' :"admin",
        '날짜' :'2020-11-20'
        }],
    };
  },
};
</script>

<style></style>
