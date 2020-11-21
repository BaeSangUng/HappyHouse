<template>
  <div>
    <table class="table">
      <tr>
        <th>번호</th>
        <td>{{ board.bno }}</td>
        <th>작성자</th>
        <td>{{ board.bwriter }}</td>
      </tr>
      <tr>
        <th>제목</th>
        <td>{{ board.btitle }}</td>
        <th>작성시간</th>
        <td>{{ board.regdate }}</td>
      </tr>
      <tr>
        <th colspan="4">내용</th>
      </tr>
      <tr>
        <td colspan="4">{{ board.bcontent }}</td>
      </tr>
    </table>

    <button v-on:click="deleteQNA">삭제</button>
    <button @click="update">수정></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: {
        bno: 3,
        btitle: '투자 1000억대 돌파 되었습니다!.',
        bwriter: 'admin',
        bcontent: '내일 다방 인수 들어갑니다.',
        regdate: '2020-11-20',
      },
    };
  },
};
</script>

<style></style>
