<template>
  <div>
    <div>
      <table>
        <tr>
          <td>
            <b-card
              :title="popHouse[0].hname"
              img-src="@/assets/건물.jpg"
              img-alt="건물"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                <ul class="cardul">
                  <li>
                    동:
                    {{ popHouse[0].hdong }}
                  </li>
                  <li>
                    가격:
                    {{ popHouse[0].hprice }}
                  </li>
                  <li>
                    면적:
                    {{ popHouse[0].hwidth }}
                  </li>
                  <li>
                    좋아요수:
                    {{ popHouse[0].count }}
                  </li>
                </ul>
              </b-card-text>
            </b-card>
          </td>
          <td>{{ popHouse[1] }}</td>
          <td>{{ popHouse[2] }}</td>
        </tr>
        <tr>
          <td>{{ popHouse[3] }}</td>
          <td>{{ popHouse[4] }}</td>
          <td>{{ popHouse[5] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      popHouse: [],
    };
  },

  created() {
    axios
      .get('http://localhost:8000/happyhouse/jjim/rank')
      .then((response) => {
        this.popHouse = response.data;
        console.log(response.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
};
</script>

<style></style>
