package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom2.JDOMException;

public class AppPatternDetection {
    public static void main(String[] args) throws JDOMException {
        FilePatternDetection filePatternDetection = new FilePatternDetection();
        try {
            filePatternDetection.readOutput();
        } catch (IOException ex) {
            Logger.getLogger(AppPatternDetection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
