<!-- src/components/TablePage.vue -->
<template>
  <div class="table-page-container">
    <h1 class="text-center mb-4">{{ msg }}</h1>
    <div class="table-responsive small">
      <table class="table table-striped table-hover table-bordered table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">审核记录id</th>
            <th scope="col">题目id</th>
            <th scope="col">题目内容</th>
            <th scope="col">审核结果</th>
            <th scope="col">创建时间</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review) in reviewsList" :key="review.id">
            <td>{{ review.id }}</td>
            <td>{{ review.exercise }}</td>
            <td>{{ getExerciseTitle(review.exercise) }}</td>
            <td>{{ getReviewResult(review.result) }}</td>
            <td>{{ review.created_date }}</td>
            <td>
              <button class="btn btn-secondary rounded-pill px-3" type="button" @click="openNewWindow(review, getExercise(review.exercise), this.accessToken)">检查</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviewsList: [],
      exercisesList: [],
      globalAccessToken: '',
      errorMessage: '',
      accessToken: localStorage.getItem('accessToken')
    };
  },
  async created() {
    try {
      this.globalAccessToken = await this.getValidAccessToken();
      await this.fetchDataWithRetry('http://www.saintz.cn:8000/api/v1/reviews/', 'reviewsList');
      await this.fetchDataWithRetry('http://www.saintz.cn:8000/api/v1/exercises/', 'exercisesList');
    } catch (error) {
      console.error('Failed to fetch data:', error);
      this.errorMessage = 'Failed to fetch data. Please try again.';
    }
  },
  methods: {
    async fetchDataWithRetry(url, listName) {
      const accessToken = await this.getValidAccessToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this[listName] = data.results;
    },
    async getValidAccessToken() {
      let accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        throw new Error('Tokens are missing. Please login again.');
      }

      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (tokenPayload.exp < now) {
        const response = await fetch('http://www.saintz.cn:8000/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh: refreshToken })
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        accessToken = data.access;
        localStorage.setItem('accessToken', accessToken);
      }

      return accessToken;
    },
    getExerciseTitle(exerciseId) {
      const exercise = this.exercisesList.find(ex => ex.id === exerciseId);
      return exercise ? exercise.title : '未知题目';
    },
    getExercise(exerciseId) {
      return this.exercisesList.find(ex => ex.id === exerciseId) || {};
    },
    getReviewResult(result) {
      return result === null ? '空' : result;
    },
    openNewWindow(review, exercise, accessToken) {
      const params = new URLSearchParams({
        ReviewId: review.id,
        ExerciseId: exercise.id,
        title: encodeURIComponent(exercise.title),
        answer: encodeURIComponent(exercise.answer),
        explanation: encodeURIComponent(exercise.explanation),
        image_path: encodeURIComponent(exercise.image_path),
        status: encodeURIComponent(exercise.status),
        accessToken: encodeURIComponent(accessToken)
      }).toString();
      const url = `http://localhost:8081/?${params}`;
      window.open(url);
    }
  }
};
</script>

<style scoped>
.table-page-container {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.table-responsive {
  margin: 20px 0;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table-hover tbody tr:hover {
  color: #495057;
  background-color: rgba(0, 0, 0, 0.075);
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.thead-dark th {
  background-color: #343a40;
  color: #fff;
  border-color: #454d55;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.alert {
  padding: 15px;
  margin-top: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
