package gr.csd.uoc.cs359.winter2020.photobook.servlets;

import com.google.gson.Gson;
import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.User;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

@WebServlet(urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("1234");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");

        BufferedReader br =
                new BufferedReader(new InputStreamReader(request.getInputStream()));
        String json = "";
        if(br != null){
            json = br.readLine();
        }
        Map map = new Gson().fromJson(json, Map.class);
        try {
            User user = UserDB.getUser((String) map.get("username"));
            if (user == null) {
                response.sendError(404);
                return;
            }
            if (user.getPassword().equals(map.get("password"))) {
                Cookie cookie = new Cookie("username",user.getUserName());
                cookie.setMaxAge(30);
                response.addCookie(cookie);
                response.getWriter().write(new Gson().toJson(user));
                return;
            }
            response.sendError(404);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        Cookie cookie = new Cookie("username","");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
