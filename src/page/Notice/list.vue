<template>
  <div>
    <table class="table">
      <tr>
        <td>번호</td>
        <td>제목</td>
        <td>작성자</td>
        <td>날짜</td>
      </tr>
      <tr v-for="item in items" v-bind:key="item.bno">
        <td>{{ item.bno }}</td>
        <td>
          <router-link :to="'/happyhouse/HelpDesk/Notice/read'">
            {{ item.btitle }}</router-link
          >
        </td>
        <td>{{ item.bwriter }}</td>
        <td>{{ item.regdate }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          bno: 1,
          btitle: '반갑습니다 여러분, Ez Real estate입니다.',
          bwriter: 'admin',
          regdate: '2020-11-19',
        },
        {
          bno: 2,
          btitle: '사용 방법은 about을 통해 확인 하여 주세요.',
          bwriter: 'admin',
          regdate: '2020-11-20',
        },
        {
          bno: 3,
          btitle: '투자 1000억대 돌파 되었습니다!.',
          bwriter: 'admin',
          regdate: '2020-11-20',
        },
        {
          bno: 4,
          btitle: '채용 공고 안내',
          bwriter: 'admin',
          regdate: '2020-11-20',
        },
      ],
    };
  },
};
</script>

<style></style>
