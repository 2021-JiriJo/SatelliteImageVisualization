<%@ page import="java.sql.*"%>
<%
    Connection conn = null;

    String url = "jdbc:oracle:thin:@localhost:1521:XE";
    String user = "jirijo";
    String password = "7602";

    Class.forName("oracle.jdbc.driver.OracleDriver");
    conn = DriverManager.getConnection(url, user, password);
%>