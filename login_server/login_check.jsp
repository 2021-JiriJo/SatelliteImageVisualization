<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <%@ include file="dbconnect.jsp" %>

    <%
        request.setCharacterEncoding("utf-8");
        
        // 프론트엔드에서 post 형식으로 전달된 값을 읽어와 id, passwd에 저장
        String id = request.getParameter("id");
        String passwd = request.getParameter("password");


        session = request.getSession();
        Statement stmt = null;
        ResultSet rs = null;
        
        String sql = "SELECT * FROM USERS";    //실행시키고자 하는 sql문 입력

        stmt = conn.createStatement();

        rs = stmt.executeQuery(sql);    //검색 쿼리 실행문의 결과
        // rs = stmt.executeUpdate(sql);    //변경 쿼리 실행문

        while(rs.next()){
            String sqlId = rs.getString("ID");  // id는 db의 column이름
            String sqlPasswd = rs.getString("PASSWD");  // passwd는 db의 column이름

            if(sqlId.equals(id) && sqlPasswd.equals(passwd)){
                //세션에 id저장
                session.setAttribute("ID", id);

                //로그인 성공시 넘어갈 페이지 지정
                response.sendRedirect("http://www.naver.com");
            }

        }
    %>
    <script type="text/javascript">
        alert("아이디 또는 패스워드 정보가 잘못되었습니다.")

        //로그인 실패시 넘어갈 페이지 지정
        document.location.href="http://www.google.com";
    </script>
    

    <%
        if(stmt != null)
            stmt.close();
        if(conn != null)
            conn.close();
    %>
</body>
</html>


