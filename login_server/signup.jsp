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
        
        // 회원가입 폼에서 입력된 값을 가져옴
        String id = request.getParameter("id");
        String passwd = request.getParameter("password");
        String name = request.getParameter("name");
        String phone = request.getParameter("phone");


        Statement stmt = null;
        ResultSet rs = null;
        
        String sql = "SELECT * FROM USERS";    //실행시키고자 하는 sql문 입력

        stmt = conn.createStatement();

        rs = stmt.executeQuery(sql);    //검색 쿼리 실행문의 결과
        // rs = stmt.executeUpdate(sql);    //변경 쿼리 실행문

        while(rs.next()){
            String sqlId = rs.getString("ID");  // id는 db의 column이름

            if(sqlId.equals(id)){
                %>
                <!--회원가입이 실패하였을 경우 이동할 페이지-->
                <script type="text/javascript">
                    alert("동일한 아이디가 존재합니다.");
                    document.location.href="http://www.naver.com";
                </script>
                <%
            }
        }

        // DB에 데이터를 추가할 sql 쿼리문
        sql = "INSERT INTO USERS VALUES ('"+id+"', '"+passwd+"', '"+name+"', '"+phone+"')";
        stmt.executeUpdate(sql);
    %>

    <!--회원가입이 성공한 후 알림창을 클릭하면 이동할 페이지 지정-->
    <script type="text/javascript">
        alert("회원가입이 완료되었습니다.")
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


