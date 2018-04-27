/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf.models;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 */
public class Instance {
    private List<Role> roles;

    public Instance() {
        this.roles = new ArrayList<>();
    }
    
    public Instance(List<Role> roles) {
        this.roles = roles;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
    
    public void addRole(Role role) {
        this.roles.add(role);
    }

    @Override
    public String toString() {
        return "Instance{" + "roles=" + roles + '}';
    }
    
    
}
