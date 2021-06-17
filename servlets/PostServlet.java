package gr.csd.uoc.cs359.winter2020.photobook.servlets;

import com.google.gson.Gson;
import gr.csd.uoc.cs359.winter2020.photobook.db.PostDB;
import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Post;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@WebServlet(urlPatterns = {"/posts"})
public class PostServlet extends HttpServlet {

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        response.setContentType("text/plain");
        Post post = PostDB.getPost(1);
        response.getWriter().write(post.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        if (request.getParameter("viewposts").equals("true")) {
            if (request.getParameter("user").equals("")) {
            } else {
                String username = request.getParameter("user");
                try {
                    if (UserDB.getAllUsersNames().contains(username)) {
                        List<Post> posts = PostDB.getTop10RecentPostsOfUser(username);
                        StringBuilder answer = new StringBuilder();
                        for (Post post : posts) {
                            System.out.println(post);
                            answer.append(post);
                        }
                        response.getWriter().write(new Gson().toJson(answer));
                    } else {
                        response.setStatus(404);
                    }
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        if  (request.getParameter("newpost").equals("true")) {
            BufferedReader br =
                    new BufferedReader(new InputStreamReader(request.getInputStream()));
            String json = "";
            if(br != null){
                json = br.readLine();
            }

            Map<String, String> map = new Gson().fromJson(json, Map.class);
            Post post = new Post();
            post.setDescription(map.get("description"));
            post.setUserName(map.get("userName"));
            try {
                PostDB.addPost(post);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }

    }
}
