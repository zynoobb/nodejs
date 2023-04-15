// 우리가 생각하는 페이지네이션
// Skip : 생략할 개수
// Take : 가져올 개수

// 실제 프런트에서는
// 페이지번호 / 가져올 개수
// posts?page=1&limit=20
// req.query { page : 1, limit : 20 }
// Skip =  (page -1) * limit
