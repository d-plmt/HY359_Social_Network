package gr.csd.uoc.cs359.winter2020.photobook.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@WebServlet(urlPatterns = {"/users"})
public class UserServlet extends HttpServlet {

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, IOException {
        String answer;
        response.setContentType("application/json");

        User user = new User();
        String username = request.getParameter("username");
        if (username != null) {
            response.getWriter().write(new Gson().toJson(UserDB.getUser(username)));
        }
        else {
            response.getWriter().write(new Gson().toJson(UserDB.getUsers()));
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        if  (request.getParameter("getinfo").equals("true")) {
            try {
                String cookie = request.getParameter("user");
                String username = cookie.substring(cookie.indexOf("=")+1);
                for (User user2: UserDB.getUsers()) {
                    if (user2.getUserName().equals(username)) {
                        response.getWriter().write(new Gson().toJson(user2));
                        return;
                    }
                }
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        } else {
            try {
                response.getWriter().write(new Gson().toJson(UserDB.getUsers()));
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }

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
        User user = new User();
        Map<String, String> map = new Gson().fromJson(json, Map.class);

        user.setUserName(map.get("userName"));
        user.setEmail(map.get("email"));
        user.setPassword(map.get("password"));
        user.setFirstName(map.get("firstName"));
        user.setLastName(map.get("lastName"));
        user.setBirthDate(map.get("birthDate"));
        user.setCountry(map.get("country"));
        user.setTown(map.get("town"));
        user.setAddress(map.get("address"));
        user.setOccupation(map.get("occupation"));
        user.setInterests(map.get("interests"));
        user.setInfo(map.get("info"));
        user.setGender(map.get("gender"));
        user.setRegisteredSince(java.time.LocalDate.now().toString());
        try {
            String errors = validator(user);
            //if (errors.equals("")) {

                if  (request.getParameter("signed").equals("true")) {
                    UserDB.updateUser(user);
                } else {
                    if (UserDB.getAllUsersNames().contains(user.getUserName()) || (UserDB.getUsers().stream().anyMatch(User -> User.getEmail().equals(user.getEmail())))) {
                        response.setStatus(400);
                        response.getWriter().write(errors);
                    } else {
                        UserDB.addUser(user);
                    }
                }
            //}
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


        /*try {
            String errors = validator(user);
            if (errors.equals("")) {
                if (UserDB.getAllUsersNames().contains(map.get("userName"))) {
                    UserDB.updateUser(user);
                } else {
                    UserDB.addUser(user);
                }
            } else {
                response.setStatus(400);
                response.getWriter().write(errors);
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
            /*if (UserDB.getAllUsersNames().contains(map.get("userName")) || (UserDB.getUsers().stream().anyMatch(User -> User.getEmail().equals(map.get("email"))))) {
                System.out.println(user.getRegisteredSince());
                if (!user.getRegisteredSince().equals("")) {
                    UserDB.updateUser(user);
                } else {
                    System.out.println("This member already exists.");
                    response.setStatus(400);
                }

            } else {

            }*/
        //response.getWriter().write(json);
    }

    private String validator(User user) {
        String response = "";
        if (!user.getUserName().matches("[^A-Za-z0-9].{8,}"))  {
            response += "Username is wrong\n";
        }
        if (!user.getEmail().contains("@")) {
            response += "E-Mail is wrong\n";
        }
        if (!user.getPassword().matches("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,10}$")) {
            response += "Password is wrong\n";
        }
        if (!user.getFirstName().matches(".{3,15}")) {
            response += "Name is wrong\n";
        }
        if (!user.getLastName().matches(".{3,15}")) {
            response += "Surname is wrong\n";
        }
        if (!user.getTown().matches(".{3,20}")) {
            response += "Town is wrong\n";
        }
        if (!user.getOccupation().matches(".{3,20}")) {
            response += "Work is wrong\n";
        }
        if (!user.getInterests().matches(".{0,100}")) {
            response += "Interests are wrong\n";
        }
        if (!user.getInfo().matches(".{0,500}")) {
            response += "Bio is wrong\n";
        }
        return response;
    }
}
